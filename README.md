# Шифр ADFGVX
# Код реализует шифр ADFGVX, который является комбинацией шифра простой замены и перестановки. 

Шифрование:
1. Замена: 
   - Каждый символ исходного текста (буквы, цифры, знаки препинания) заменяется на пару символов ADFGVX, согласно таблице `substitutionTable`. 
   - Эта часть использует шифр простой замены, где каждый символ имеет уникальную замену.
2. Транспозиция:
   - Зашифрованный текст разбивается на столбцы, количество которых равно длине ключа.
   - Столбцы сортируются в соответствии с алфавитным порядком букв ключа.
   - После сортировки столбцы соединяются в строку, формируя финальный зашифрованный текст.
Дешифрование:
1. Обратная транспозиция:
   - Зашифрованный текст делится на столбцы, количество которых равно длине ключа.
   - Столбцы сортируются в обратном порядке (по алфавиту ключа в обратном порядке).
   - Столбцы соединяются в строку, формируя текст, где символы стоят в исходном порядке.
2. Обратная замена:
   - Каждая пара символов ADFGVX заменяется на исходный символ, согласно таблице `reverseSubstitutionTable`.
   - Эта часть использует обратный шифр простой замены, используя `reverseSubstitutionTable`.

Использование
- Введите текст для шифрования/дешифрования в поле "Текст".
- Введите ключ в поле "Ключ".
- Нажмите "Зашифровать" или "Расшифровать".
- Результат будет отображен в поле "Результат".
