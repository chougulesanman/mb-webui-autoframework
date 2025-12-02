export function countCharacterFrequency(input: string): string {
  if (!input) {
    return '';
  }

  const characterCounter = new Map<string, number>();

  for (const character of input) {
    const currentCount = characterCounter.get(character) || 0;
    characterCounter.set(character, currentCount + 1);
  }

  const outputParts: string[] = [];
  for (const [character, count] of characterCounter) {
    outputParts.push(`${character}:${count}`);
  }

  return outputParts.join(', ');
}

if (require.main === module) {
  const testCases = ['hello world', 'Hello World', 'aabbcc', 'abcabc', 'a', '123321', '', 'The quick brown fox jumps over the lazy dog'];
  for (const testCase of testCases) {
    console.log(`Input:  "${testCase}"`);
    console.log(`Output: ${countCharacterFrequency(testCase) || '(empty)'}`);
    console.log('---');
  }
}