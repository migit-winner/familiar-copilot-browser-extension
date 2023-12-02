const removeElementById = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.parentNode.removeChild(element);
    }
}

const handleInputEvent = (event) => {
    // すでにカードが表示されている場合は削除
    removeElementById('suggest-card');
    removeElementById('input-suggestion');

    let inputValue;
    console.log(event.target.getAttribute('contenteditable'));

    // 入力された値を取得
    if (event.target.getAttribute('contenteditable') === 'true') {
        const suggestion = document.createElement('div');
        suggestion.innerHTML = event.target.innerHTML;
        suggestion.className = event.target.className;
        suggestion.id = 'input-suggestion';
        suggestion.style.position = 'absolute';
        suggestion.style.color = 'red';
        const conputedStyle = window.getComputedStyle(event.target.parentElement);
        suggestion.style.top = conputedStyle.getPropertyValue('padding-top');
        suggestion.style.left = conputedStyle.getPropertyValue('padding-left');
        console.log(suggestion);
        event.target.parentElement.appendChild(suggestion);
    } else if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        inputValue = event.target.value;
    }
    else {
        inputValue = event.target.innerText;
    }

    const card = document.createElement('div');
    card.id = 'suggest-card';
    card.innerHTML = '<div>提案テキスト</div>';

    // スタイルを設定
    card.style.position = 'fixed';
    card.style.right = '1rem';
    card.style.backgroundColor = '#4CAF50'; // 例: 緑色の背景
    card.style.color = 'white'; // テキストの色
    card.style.padding = '1rem';
    card.style.borderRadius = '1rem';
    card.style.boxShadow = '0 0.5rem 0.75rem rgba(0,0,0,0.2)';
    card.style.zIndex = '1000';

    const rect = event.target.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight / 2) {
        card.style.bottom = '1rem';
    } else {
        card.style.top = '1rem';
    }

    // bodyの最後にカードを追加
    document.body.appendChild(card);

    // コンソールに入力値を表示（デバッグ用）
    console.log("Input:", inputValue);
    console.log(event.target);
    console.log();

    // 必要に応じて他の処理をここに追加
}

document.addEventListener('input', handleInputEvent);

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "accept-suggestion") {
        console.log("ショートカットがコンテンツスクリプトでアクティブになりました！");
        // ここで必要なアクションを実行します
    }
});
