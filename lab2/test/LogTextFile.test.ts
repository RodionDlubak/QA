import { Directory } from '../src/Directory';
import { LogTextFile } from '../src/LogTextFile';

describe('Log text file', () => {
  const filename = 'filename';
  let rootDir = null;

  beforeEach(() => {
    rootDir = new Directory(null, 'root');
  });

  test('should be successfully created', () => {
    expect(() => new LogTextFile(rootDir, 'file1')).not.toThrowError();
  });

  test('should have a proper filename', () => {
    const ltf = new LogTextFile(rootDir, filename);
    expect(ltf.name).toBe(filename);
  });

  test('should have a proper parent', () => {
    const ltf = new LogTextFile(rootDir, filename);
    expect(ltf.parent).toBe(rootDir);
  });

  test('should have a proper default content', () => {
    const ltf = new LogTextFile(rootDir, filename);
    expect(ltf.content).toBe('');
  });

  test('should append content to the end of the file', () => {
    const ltf = new LogTextFile(rootDir, filename);
    ltf.append('a');
    expect(ltf.content).toBe('a\n');
    ltf.append('b');
    expect(ltf.content).toBe('a\nb\n');
  });
});
