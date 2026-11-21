/**
 * お問い合わせ用 Google フォームを作るスクリプト
 *
 * 使い方：
 *  1. https://script.google.com を開き「新しいプロジェクト」
 *  2. 中身をすべて消して、このファイルの内容を貼り付けて保存
 *  3. 上の「実行」を押す（初回は権限の許可を求められるので許可）
 *  4. 下の「実行ログ」に出る「回答用URL」をコピー
 *
 * ※ ゆいまーるプラン・覚悟プランへの参加は note から受け付けるため、
 *    このフォームの選択肢には入れていません。
 */
function createContactForm() {
  var form = FormApp.create('ゆいまーるファスティング お問い合わせ');
  form.setDescription(
    'ファスティングや講座・サポートについてのご質問、最新情報の受け取りはこちらから。\n' +
    '沖縄の薬剤師が内容を確認し、メールでお返事します。'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setConfirmationMessage(
    'お問い合わせありがとうございます。\n内容を確認して、メールでご連絡します。'
  );

  form.addTextItem()
    .setTitle('お名前（ニックネーム可）')
    .setRequired(true);

  var emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .setHelpText('メールアドレスの形で入力してください')
    .build();
  form.addTextItem()
    .setTitle('メールアドレス')
    .setHelpText('お返事・最新情報をお送りします')
    .setValidation(emailValidation)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('お問い合わせの種類')
    .setChoiceValues([
      'ファスティングについての質問',
      'はじめてのファスティング講座について',
      'みんなで伴走サポートについて',
      '最新情報を受け取りたい',
      '取材・講演などのご依頼'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('お問い合わせ内容')
    .setHelpText('服用中のお薬や持病があれば、あわせてお書きください')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('最新情報のお知らせ')
    .setChoiceValues(['講座・サポートの最新情報をメールで受け取る'])
    .setRequired(false);

  Logger.log('回答用URL（サイトに貼るのはこちら）: ' + form.getPublishedUrl());
  Logger.log('編集用URL: ' + form.getEditUrl());
}
