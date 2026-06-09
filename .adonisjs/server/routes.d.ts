import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'landing_page': { paramsTuple?: []; params?: {} }
    'login.get': { paramsTuple?: []; params?: {} }
    'login.post': { paramsTuple?: []; params?: {} }
    'logout': { paramsTuple?: []; params?: {} }
    'register.get': { paramsTuple?: []; params?: {} }
    'register.post': { paramsTuple?: []; params?: {} }
    'game': { paramsTuple: [ParamValue]; params: { characterId: ParamValue } }
    'character_list_page': { paramsTuple?: []; params?: {} }
    'character_page': { paramsTuple: [ParamValue]; params: { characterId: ParamValue } }
    'world_page': { paramsTuple: [ParamValue]; params: { worldId: ParamValue } }
    'character.store': { paramsTuple?: []; params?: {} }
    'loot': { paramsTuple: [ParamValue]; params: { worldId: ParamValue } }
    'update_inventory_item_position': {
      paramsTuple: [ParamValue, ParamValue]
      params: { characterId: ParamValue; itemId: ParamValue }
    }
  }
  GET: {
    'landing_page': { paramsTuple?: []; params?: {} }
    'login.get': { paramsTuple?: []; params?: {} }
    'logout': { paramsTuple?: []; params?: {} }
    'register.get': { paramsTuple?: []; params?: {} }
    'game': { paramsTuple: [ParamValue]; params: { characterId: ParamValue } }
    'character_list_page': { paramsTuple?: []; params?: {} }
    'character_page': { paramsTuple: [ParamValue]; params: { characterId: ParamValue } }
    'world_page': { paramsTuple: [ParamValue]; params: { worldId: ParamValue } }
    'loot': { paramsTuple: [ParamValue]; params: { worldId: ParamValue } }
  }
  HEAD: {
    'landing_page': { paramsTuple?: []; params?: {} }
    'login.get': { paramsTuple?: []; params?: {} }
    'logout': { paramsTuple?: []; params?: {} }
    'register.get': { paramsTuple?: []; params?: {} }
    'game': { paramsTuple: [ParamValue]; params: { characterId: ParamValue } }
    'character_list_page': { paramsTuple?: []; params?: {} }
    'character_page': { paramsTuple: [ParamValue]; params: { characterId: ParamValue } }
    'world_page': { paramsTuple: [ParamValue]; params: { worldId: ParamValue } }
    'loot': { paramsTuple: [ParamValue]; params: { worldId: ParamValue } }
  }
  POST: {
    'login.post': { paramsTuple?: []; params?: {} }
    'register.post': { paramsTuple?: []; params?: {} }
    'character.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    update_inventory_item_position: {
      paramsTuple: [ParamValue, ParamValue]
      params: { characterId: ParamValue; itemId: ParamValue }
    }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}
