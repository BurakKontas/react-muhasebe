export function emailCleaner(string) {
    var list = [".", "#", "$", "[", "]","@","€"]//daha yasaklı simge gelirse eklerim
    list.forEach(element => {
        string = string.replace(element,"-")
    })
    return(string) 
}