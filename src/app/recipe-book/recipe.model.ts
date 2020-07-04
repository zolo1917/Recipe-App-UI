export class recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public contentItems: string[] = [];

    constructor(name: string, desc: string, imgPath: string, contentList: string[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imgPath;
        contentList.forEach(content => {
            this.contentItems.push(content);
        });
    }
}