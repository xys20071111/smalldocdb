import fs from 'fs'
export default class Database {
    private path: string
    private jsonStr: string
    private data: Map<string, any> = new Map<string, any>()
    constructor(path: string) {
        this.path = path
        if(fs.existsSync(path)){
            this.jsonStr = fs.readFileSync(path,{encoding:'utf-8'})
        }else{
            this.jsonStr = '{}'
        }
        try {
            const dataObject = JSON.parse(this.jsonStr)
            for (const key in dataObject) {
                this.data.set(key, dataObject[key])
            }
        }catch{

        }
        
    }
    updateFile() {
        const dataObject: any = {}
        for (const [key, value] of this.data) {
            dataObject[key] = value
        }
        this.jsonStr = JSON.stringify(dataObject)
        fs.writeFileSync(this.path, this.jsonStr, {
            flag: 'w+'
        })
    }
    get(key: string): any | undefined {
        if (this.data.has(key)) {
            return this.data.get(key)
        }
        return undefined
    }
    set(key: string, value: any) {
        if(key || key === ''){
            throw new Error('Key cannot be null')
        }
        this.data.set(key, value)
        this.updateFile()
    }
}