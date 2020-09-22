import Template from '../template/news-item-mokup.hbs'

const refs = {
    inputSerch: document.querySelector('[data-input-search="input-search"]'),
    newsList: document.querySelector('[data-news-block="news-list"]'),
}

const fethNewsAPI = {
    options: {
        headers: {
            'Authorization': 'ab2128a90db940a4b45db6d30dfd5d6f',
        },
    },
    inputQueryUser: "",
    page: 1,

    clearList() {
        refs.newsList.innerHTML = '';
    },

    serchNews(inputUser) {

        if (inputUser === "") {
            return
        }
        this.inputQueryUser = inputUser;
        this.page = 1;
        this.clearList();
        this.conectServer();
    },

    conectServer() {
        const url = `https://newsapi.org/v2/everything?q=${this.inputQueryUser}&language=en&pageSize=8&page=${this.page}`;

        fetch(url, this.options).then(resolve => { return resolve.json() })
            .then(data => {
                console.log(data)
                const mokup = Template(data.articles)
                refs.inputSerch.value = ""
                refs.newsList.insertAdjacentHTML('beforeend', mokup);
                window.scrollTo({
                    top: document.documentElement.offsetHeight,
                    behavior: "smooth"
                });
            })
            .catch(eror => {
                console.log(eror)
            })
    },

    nextPage() {
        this.page += 1;
        this.conectServer();
    },

}

export default fethNewsAPI;