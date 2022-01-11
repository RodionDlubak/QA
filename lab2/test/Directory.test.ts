import { Directory } from '../src/Directory';

describe('Directory', () => {
  const OLD_ENV = process.env;

  beforeAll(() => {
    process.env = {
      ...OLD_ENV,
      DIR_MAX_ELEMS: '2',
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  const dirname = 'dirname';
  let rootDir = null;

  beforeEach(() => {
    rootDir = new Directory(null, 'root');
  });

  test('should be successfully created', () => {
    expect(() => new Directory(rootDir)).not.toThrowError();
  });

  test('contains proper items', () => {
    const dir = new Directory(rootDir, dirname);
    expect(rootDir.content[0].name).toEqual(dir.name);
  });

  test('should have a proper dirname', () => {
    const dir = new Directory(rootDir, dirname);
    expect(dir.name).toBe(dirname);
  });

  test('should have a proper parent', () => {
    const dir = new Directory(rootDir, dirname);
    expect(dir.parent).toBe(rootDir);
  });

  test('should have a proper default files', () => {
    const dir = new Directory(rootDir, dirname);
    expect(dir.content.length).toBe(0);
  });

  test('moving the root directory', () => {
    expect(() => {
      const dir = new Directory(rootDir, dirname);
      rootDir.moveTo(dir);
    }).toThrowError();
  });

  test('overflowing the directory', () => {
    const dir = new Directory(rootDir, dirname);
    expect(() => {
      dir.addFile(new Directory(null, 'dir1'));
      dir.addFile(new Directory(null, 'dir2'));
      dir.addFile(new Directory(null, 'dir3'));
    }).toThrowError();
  });
});
