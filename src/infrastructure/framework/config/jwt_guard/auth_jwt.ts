import { symbols, AuthenticationException, InvalidCredentialsException } from '@adonisjs/auth'
import { AuthClientResponse, GuardContract } from '@adonisjs/auth/types'
import { UserProviderContract } from '@adonisjs/auth/types/core'
import jwt from 'jsonwebtoken'
import { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'

export type JwtGuardOptions = {
  secret: string
}

export class JwtGuard<UserProvider extends UserProviderContract<unknown>>
  implements GuardContract<UserProvider[typeof symbols.PROVIDER_REAL_USER]>
{
  #userProvider: UserProvider
  #options: JwtGuardOptions
  #ctx: HttpContext
  constructor(ctx: HttpContext, userProvider: UserProvider, options: JwtGuardOptions) {
    this.#ctx = ctx
    this.#userProvider = userProvider
    this.#options = options
  }
  /**
   * A list of events and their types emitted by
   * the guard.
   */
  declare [symbols.GUARD_KNOWN_EVENTS]: {}

  /**
   * A unique name for the guard driver
   */
  driverName: 'jwt' = 'jwt'

  /**
   * A flag to know if the authentication was an attempt
   * during the current HTTP request
   */
  authenticationAttempted: boolean = false

  /**
   * A boolean to know if the current request has
   * been authenticated
   */
  isAuthenticated: boolean = false

  /**
   * Reference to the currently authenticated user
   */
  user?: UserProvider[typeof symbols.PROVIDER_REAL_USER]

  /**
   * Generate a JWT token for a given user.
   * Manage redis cache for token invalidation
   */
  async generate(user: UserProvider[typeof symbols.PROVIDER_REAL_USER]): Promise<string> {
    const providerUser = await this.#userProvider.createUserForGuard(user)
    const token = jwt.sign({ userId: providerUser.getId() }, this.#options.secret)

    const key = `user:${providerUser.getId()}:token`
    if (await redis.exists(key)) {
      await redis.del(key)
    }
    await redis.set(key, token, 'EX', 60 * 60 * 24 * 30) // 30 days
    return token
  }

  /**
   * Authenticate the current HTTP request and return
   * the user instance if there is a valid JWT token
   * or throw an exception
   */
  async authenticate(): Promise<UserProvider[typeof symbols.PROVIDER_REAL_USER]> {
    /**
     * Avoid re-authentication when it has been done already
     * for the given request
     */
    if (this.authenticationAttempted) {
      return this.getUserOrFail()
    }
    this.authenticationAttempted = true

    /**
     * Ensure the auth header exists
     */
    const authHeader = this.#ctx.request.header('authorization')
    if (!authHeader) {
      throw new AuthenticationException('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    /**
     * Split the header value and read the token from it
     */
    const [, token] = authHeader.split('Bearer ')
    if (!token) {
      throw new AuthenticationException('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    /**
     * Verify token
     */
    const payload = jwt.verify(token, this.#options.secret)
    if (typeof payload !== 'object' || !('userId' in payload)) {
      throw new AuthenticationException('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    /**
     * Fetch the user by user ID and save a reference to it
     */
    this.user = await this.#userProvider.findById(payload.userId)
    return this.getUserOrFail()
  }

  /**
   * Same as authenticate, but does not throw an exception
   */
  async check(): Promise<boolean> {
    try {
      await this.authenticate()
      return true
    } catch {
      return false
    }
  }

  /**
   * Returns the authenticated user or throws an error
   */
  getUserOrFail(): UserProvider[typeof symbols.PROVIDER_REAL_USER] {
    if (!this.user) {
      throw new AuthenticationException('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    return this.user
  }

  authenticateAsClient() //user: UserProvider[typeof symbols.PROVIDER_REAL_USER]
  : Promise<AuthClientResponse> {
    throw new Error('Not implemented')
  }

  /**
   * Attempt to generate a token after verifying the user
   * credentials.
   */
  async attempt(uid: string, password: string): Promise<string> {
    /**
     * Find a user by uid
     */
    const providerUser = await this.#userProvider.findByUid(uid)
    if (!providerUser) {
      throw new InvalidCredentialsException('Invalid credentials', {
        guardDriverName: this.driverName,
      })
    }

    /**
     * Verify user password
     */
    if (!(await providerUser.verifyPassword(password))) {
      throw new InvalidCredentialsException('Invalid credentials', {
        guardDriverName: this.driverName,
      })
    }

    /**
     * Get a reference to the underlying user object
     * and call the `generate` method with it
     */
    const user = providerUser.getOriginal()
    return this.generate(user)
  }
}
