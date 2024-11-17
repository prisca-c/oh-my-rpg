export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow cross-layer imports',
      recommended: false,
    },
    messages: {
      restrictedImport: 'Imports from "{{restricted}}" are not allowed in the "{{layer}}" layer.',
    },
    schema: [],
  },
  create(context) {
    const layerSettings = context.settings.layersConfig || []
    const filePath = context.getFilename()

    const currentLayer = layerSettings.find(
      (layer) => filePath.includes(layer.pathPattern) || filePath.includes(layer.alias)
    )

    if (!currentLayer) return {}

    return {
      ImportDeclaration(node) {
        const importSource = node.source.value.split('/')[0].replace('#', '')
        const isRestricted = currentLayer.restrictedImports.some((restrictedPath) =>
          importSource.includes(restrictedPath)
        )

        if (isRestricted) {
          context.report({
            node,
            messageId: 'restrictedImport',
            data: {
              restricted: importSource,
              layer: currentLayer.layer,
            },
          })
        }
      },
    }
  },
}
