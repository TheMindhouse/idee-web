const getComponentDisplayName = (Component) =>
  Component.displayName || Component.name || "Component"

export { getComponentDisplayName }
