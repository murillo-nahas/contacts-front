import CategoryMapper from "./mappers/CategoryMapper";
import HttpClient from "./utils/HttpClient";

class CategoriesService {
    constructor() {
        this.httpClient = new HttpClient("http://localhost:3001");
    }

    async listCategories() {
        const categories = await this.httpClient.get(`/categories`);

        return categories.map(CategoryMapper.toDomain);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoriesService();
