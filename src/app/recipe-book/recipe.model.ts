import { ingredient } from './../shared/ingredient.model';
export class recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: ingredient[] = [];

    constructor(name: string, desc: string, imgPath: string, contentList: ingredient[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imgPath;
        // contentList.forEach(content => {
        //     this.ingredients.push(content);
        // });
        this.ingredients = contentList;
    }
}