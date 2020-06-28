import axios from 'axios';

export default async () => {
    try {
        return await axios('https://www.vdocipher.com/blog/wp-json/wp/v2/pages?per_page=100');
    } catch (err) {
        throw new Error(`Request failed with a status code of ${err.response.status}`);
    }
}
