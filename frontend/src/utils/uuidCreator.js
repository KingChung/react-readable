let idCounter = + new Date()
export default function(prefix){
    const id = ++idCounter + ''
    return prefix ? prefix + id : id
}