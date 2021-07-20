export const prefixFBX = (...paths) => paths.map(path => (
    `/js/assets/fbx/${path}.fbx`
))

export const prefixPNG = (...paths) => paths.map(path => (
    `/js/assets/images/${path}.png`
))

export const enableApp = () => {
    // todo: block source code
    // todo: load as PWA
}