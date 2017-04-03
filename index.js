function readStdin () {
    const chunks = []
    return new Promise((resolve, reject) => {
        process.stdin.on('readable', () => {
            const chunk = process.stdin.read()
            if (chunk) chunks.push(chunk.toString())
        })

        process.stdin.on('end', () => {
            const input = chunks.join('')
            resolve(JSON.parse(input))
        })
    })
}

function wait (ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

function set(obj, path, val) {
    const keys = path.split('.')

    let next = obj
    while (keys.length > 1) {
        const key = keys.shift()
        if (next[key] === undefined) {
            next[key] = {}
        }
        next = next[key]
    }

    const key = keys.shift()
    next[key] = val
}

function get (obj, path, defaultReturn = undefined) {
    const keys = path.split('.')

    let result = obj
    while (keys.length) {
        if (result === undefined) return defaultReturn

        const key = keys.shift()
        result = result[key]
    }

    return result === undefined ? defaultReturn : result
}

function values (obj) {
    return Object.keys(obj).map(k => obj[k])
}

function pairs (obj) {
    return Object.keys(obj).map(k => [k, obj[k]])
}

function only (obj, keys) {
    return Object.keys(obj).reduce(
        (acc, curr) => {
            if (keys.includes(curr)) {
                return Object.assign(acc, {[curr]: obj[curr]})
            }
            return acc
        },
        {}
    )

module.exports = {
    readStdin,
    wait,
    set,
    get,
    values,
    pairs,
    only
}
