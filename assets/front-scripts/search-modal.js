const searchInput = document.querySelector('.search-input');

function searchModalController() {
    const searchModal = document.querySelector('#search-modal');
    const body = document.querySelector('body');
    let input = document.querySelector('.search-input');
    let getResults = document.querySelector('#get-search-results');
    console.log(getResults);

    //работа с поисковой строкой
    getResults.addEventListener('click', async function () {
        if (!$) $ = jQuery;
        let form = $("#search-form"); // чтобы не переопределить что-то глобальное
        let formWrapper = form.parent();
        $.ajax({
            type: "POST",
            dataType: "text",
            url: ('/search'),
            data: {'title' : input.value},
            success(response) {
                let result = JSON.parse(response);
                let productsHtmls = result.results.map((item) => makeSearchResult(item, 'products'));
                let postsHtmls = result.postResults.map((item) => makeSearchResult(item, 'news'));
                formWrapper
                    .find(".results")
                    .empty()
                    .append(...productsHtmls, ...postsHtmls);
            },
            error() {
      console.log('error');
    },
        });

        function makeSearchResult(item, category) {
            let result = `<div class="search-result">
<div class="img-wrapper">
    <img class="search-image"
    src="${item.picture}" onerror="this.style.display='none'"
    />
</div>
<div class="link-formatted">
    <a href="/${category}/${item.alias}"
    >
    <p class="search-title">${item.title}</p>
    </a>
</div>
</div>`;
            return result;
        }


    })
    //показ и отключение модалки
    body.addEventListener('click', function (e) {
        let target = e.target;
        if (target.matches('#search-modal-trigger')) {
            searchModal.classList.add('show')
        } else if (target.matches('#search-modal')) {
            searchModal.classList.remove('show')
        }
    })


}
document.addEventListener("DOMContentloaded", searchModalController())