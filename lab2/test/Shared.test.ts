import { Directory } from '../src/Directory';
import { BinaryFile } from '../src/BinaryFile';

describe('Shared', () => {
  const filename = 'filename';
  let rootDir = null;

  beforeEach(() => {
    rootDir = new Directory(null, 'root');
  });

  test('file deletion', () => {
    const bf = new BinaryFile(rootDir, 'file1');
    expect(rootDir.files.length).toBe(1);

    bf.delete();
    expect(rootDir.files.length).toBe(0);
  });

  test('create same file in same dir', () => {
    expect(() => {
      new BinaryFile(rootDir, filename);
      new BinaryFile(rootDir, filename);
    }).toThrowError();
  });

  test('move the file', () => {
    const newDir = new Directory(null, 'dir');
    rootDir.addFile(newDir);

    const bf = new BinaryFile(rootDir, 'file2');
    expect(rootDir.content.includes(bf)).toBeTruthy();

    bf.moveTo(newDir);
    expect(newDir.content.includes(bf)).toBeTruthy();
  });
});
