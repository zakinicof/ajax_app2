// 関数memoを定義
function memo() {
  // 「投稿する」ボタンの情報を取得
  const submit = document.getElementById("submit");
  // 投稿するボタンを「click」した場合に実行される関数
  submit.addEventListener("click", (e) => {
    // フォームに入力された値を取得
    const formData = new FormData(document.getElementById("form"));
    // 非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // リクエストの内容を引数へ追記
    // HTTPメソッドはPOST、パスは/posts、非同期通信はtrue
    XHR.open("POST", "/posts", true);
    // 返却されるデータ形式はJSONに指定
    XHR.responseType = "json";
    // メモ投稿のフォームに入力された情報を送信
    XHR.send(formData);
    // レスポンスの受信に成功したら呼び出される
    XHR.onload = () => {
      // もし処理が成功しなかったら
      if (XHR.status != 200) {
        アラートを発して
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // この下の処理を止める
        return null;
      }
      // レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // 「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // メモの入力フォームをリセットするため
      const formText = document.getElementById("content");
      // 「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // 要素listの直後にHTMLを挿入
      list.insertAdjacentHTML("afterend", HTML);
      // 空の文字列に上書き
      formText.value = "";
    };
    // 標準設定されている（Default）イベントを阻止する（prevent）
    e.preventDefault();
  });
}
// ページを読み込んだ時に実行
window.addEventListener("load", memo);