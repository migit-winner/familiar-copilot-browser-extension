const removeElementById = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.parentNode.removeChild(element);
    }
}

const onFocusOutHandler = () => {
    console.log("フォーカスが外れました！");

    removeElementById('input-suggestion');
}

const copyStyles = (sourceElement, targetElement) => {
    // 元の要素からスタイルを取得
    const styles = sourceElement.style;

    // インラインスタイルをターゲットの要素にコピー
    for (let i = 0; i < styles.length; i++) {
        const styleName = styles[i];
        const styleValue = styles[styleName];
        targetElement.style[styleName] = styleValue;
    }
}

const handleInputEvent = (event) => {
    // すでにカードが表示されている場合は削除
    removeElementById('input-suggestion');

    let inputValue;
    const suggestion = document.createElement('div');

    // 入力された値を取得
    if (event.target.getAttribute('contenteditable') === 'true') {
        suggestion.innerHTML = event.target.innerHTML;
        inputValue = event.target.innerText;
    } else if (event.target.tagName === 'TEXTAREA') {
        suggestion.innerHTML = event.target.value;
        inputValue = event.target.value;
    } else if (event.target.tagName === 'INPUT') {
        suggestion.innerHTML = event.target.value;
        inputValue = event.target.value;
    }
    else {
        console.log("?????");
        console.log(event.target);
        inputValue = event.target.innerText;
    }

    copyStyles(event.target, suggestion);

    suggestion.className = event.target.className;
    suggestion.id = 'input-suggestion';
    suggestion.style.position = 'absolute';
    suggestion.style.userSelect = 'none';
    suggestion.style.color = 'red';
    suggestion.style.zIndex = '1000';
    const conputedStyle = window.getComputedStyle(event.target.parentElement);
    suggestion.style.top = conputedStyle.getPropertyValue('padding-top');
    suggestion.style.left = conputedStyle.getPropertyValue('padding-left');
    event.target.addEventListener("focusout", onFocusOutHandler);
    event.target.parentElement.insertBefore(suggestion, event.target.parentElement.firstChild);

    // コンソールに入力値を表示（デバッグ用）
    console.log("Input:", inputValue);
}

document.addEventListener('input', handleInputEvent);

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "accept-suggestion") {
        console.log("ショートカットがコンテンツスクリプトでアクティブになりました！");
        // ここで必要なアクションを実行します
    }
});
