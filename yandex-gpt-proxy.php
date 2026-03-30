<?php
// yandex-gpt-proxy.php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// ========== НАСТРОЙКИ (ЗАМЕНИТЕ НА СВОИ) ==========
$apiKey = 'ВАШ_API_КЛЮЧ';          // Получить в Yandex Cloud
$folderId = 'ВАШ_FOLDER_ID';       // Идентификатор каталога
// ==================================================

$input = json_decode(file_get_contents('php://input'), true);
$userMessage = $input['message'] ?? '';

if (empty($userMessage)) {
    echo json_encode(['error' => 'Сообщение не может быть пустым']);
    exit;
}

$url = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

$systemPrompt = "Ты — виртуальный помощник Парголовской библиотеки. Твоя задача — отвечать на вопросы о библиотеке: режим работы, услуги, мероприятия, книги. Будь вежливым, дружелюбным и полезным. Если вопрос не по теме библиотеки, вежливо предложи обратиться к другим источникам.";

$data = [
    'modelUri' => 'gpt://' . $folderId . '/yandexgpt-lite',
    'completionOptions' => [
        'stream' => false,
        'temperature' => 0.6,
        'maxTokens' => '1000'
    ],
    'messages' => [
        ['role' => 'system', 'text' => $systemPrompt],
        ['role' => 'user', 'text' => $userMessage]
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Api-Key ' . $apiKey,
    'x-folder-id: ' . $folderId
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    echo json_encode(['error' => 'Ошибка при обращении к YandexGPT: ' . $httpCode]);
    exit;
}

$result = json_decode($response, true);
$answer = $result['result']['alternatives'][0]['message']['text'] ?? 'Извините, не удалось получить ответ.';

echo json_encode(['answer' => $answer]);