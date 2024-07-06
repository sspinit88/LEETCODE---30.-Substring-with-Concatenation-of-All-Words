/*
30. Substring with Concatenation of All Words

You are given a string s and an array of strings words. All the strings of words are of the same length.

A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.

    For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. "acdbef" is not a concatenated string because it is not the concatenation of any permutation of words.

Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order.

 

Example 1:

Input: s = "barfoothefoobarman", words = ["foo","bar"]

Output: [0,9]

Explanation:

The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.

Example 2:

Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]

Output: []

Explanation:

There is no concatenated substring.

Example 3:

Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]

Output: [6,9,12]

Explanation:

The substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"].
The substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"].
The substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"].

*/

/*
Ваша задача - найти все подстроки в строке s, которые являются конкатенацией всех строк из массива words. Все строки в words имеют одинаковую длину.

Вот шаги, которые мы будем следовать:

1. Создайте словарь для подсчета слов в words.
2. Используйте скользящее окно одного размера слова для проверки каждого слова в s.
3. Если слово присутствует в словаре, уменьшите его счетчик.
4. Если счетчик слова равен 0, увеличьте счетчик найденных слов.
5. Если количество найденных слов равно количеству слов в words, добавьте начальный индекс в результат.
6. Если размер окна равен общей длине всех слов в words, верните счетчик и счетчик найденных слов назад.

Your task is to find all substrings in string s that are a concatenation of all strings from the array words. All strings in words are of the same length.

Here are the steps we will follow:

1. Create a dictionary to count the words in words.
2. Use a sliding window of one word size to check each word in s.
3. If the word is present in the dictionary, decrease its counter.
4. If the counter of the word is 0, increase the counter of found words.
5. If the count of found words equals the count of words in words, add the starting index to the result.
6. If the size of the window equals the total length of all words in words, move the counter and the counter of found words back.

*/

function findSubstring(s, words) {
  // Создаем словарь для подсчета слов в words
  // Create a dictionary to count the words in words
  let wordMap = new Map();
  let wordNum = words.length;
  let oneWord = words[0].length;
  let allLen = oneWord * wordNum;
  let res = [];

  // Подсчитываем слова в words
  // Count the words in words
  for (let w of words) {
    wordMap.set(w, (wordMap.get(w) || 0) + 1);
  }

  // Проверяем каждое слово в s
  // Check each word in s
  for (let i = 0; i < oneWord; i++) {
    let left = i;
    let right = i;
    let count = 0;
    let tmpMap = new Map();

    // Пока правый указатель не достигнет конца s
    // Until the right pointer reaches the end of s
    while (right + oneWord <= s.length) {
      let w = s.slice(right, right + oneWord);
      right += oneWord;

      // Если слово присутствует в словаре
      // If the word is present in the dictionary
      if (!wordMap.has(w)) {
        count = 0;
        left = right;
        tmpMap.clear();
      } else {
        tmpMap.set(w, (tmpMap.get(w) || 0) + 1);
        count++;

        // Если счетчик слова равен 0
        // If the counter of the word is 0
        while (tmpMap.get(w) > wordMap.get(w)) {
          let t_w = s.slice(left, left + oneWord);
          count--;
          tmpMap.set(t_w, tmpMap.get(t_w) - 1);
          left += oneWord;
        }

        // Если количество найденных слов равно количеству слов в words
        // If the count of found words equals the count of words in words
        if (count === wordNum) res.push(left);
      }
    }
  }

  // Возвращаем результат
  // Return the result
  return res;
}
