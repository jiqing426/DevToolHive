import {
  formatJson,
  minifyJson,
  jsonToYaml,
  yamlToJson,
  validateJson,
  diffJson,
  jsonToCsv,
} from '../src/lib/tools/jsonYaml';

function eq(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

let pass = 0;
let fail = 0;

function test(name: string, fn: () => boolean): void {
  try {
    const ok = fn();
    console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
    if (ok) pass += 1;
    else fail += 1;
  } catch (e) {
    console.log(`ERROR: ${name} - ${(e as Error).message}`);
    fail += 1;
  }
}

// 1. 格式化压缩 JSON
test('formatJson 把压缩 JSON 格式化为带缩进', () => {
  const r = formatJson('{"a":1,"b":2}');
  return r.error === null && r.output.includes('\n') && r.output.includes('"a": 1');
});

// 2. 压缩 JSON
test('minifyJson 把多行 JSON 压缩为一行', () => {
  const r = minifyJson('{\n  "a": 1\n}');
  return r.error === null && r.output === '{"a":1}';
});

// 3. JSON → YAML
test('jsonToYaml 把对象转为 YAML', () => {
  const r = jsonToYaml('{"name":"DevToolHive","count":3}');
  return (
    r.error === null &&
    r.output.includes('name: DevToolHive') &&
    r.output.includes('count: 3')
  );
});

// 4. YAML → JSON
test('yamlToJson 把 YAML 转为 JSON 对象', () => {
  const r = yamlToJson('name: DevToolHive\ncount: 3');
  return r.error === null && eq(JSON.parse(r.output), { name: 'DevToolHive', count: 3 });
});

// 5. 校验合法 JSON
test('validateJson 合法 JSON 返回 null', () => validateJson('{"a":1}') === null);

// 6. 校验非法 JSON
test('validateJson 非法 JSON 返回错误信息', () => validateJson('{bad}') !== null);

// 7. 非法 JSON 格式化报错
test('formatJson 非法 JSON 返回 error', () => formatJson('{bad}').error !== null);

// 8. Diff 标记增删行
test('diffJson 显示删除(-)与新增(+)行', () => {
  const d = diffJson('{"a":1}', '{"a":2}');
  return d.includes('-') && d.includes('+');
});

// 9. JSON 数组 → CSV
test('jsonToCsv 把对象数组转为 CSV', () => {
  const r = jsonToCsv('[{"name":"a","age":1},{"name":"b","age":2}]');
  return (
    r.error === null &&
    r.output.includes('name,age') &&
    r.output.includes('a,1') &&
    r.output.includes('b,2')
  );
});

// 10. 嵌套对象转 YAML
test('jsonToYaml 处理嵌套对象', () => {
  const r = jsonToYaml('{"a":{"b":1}}');
  return r.error === null && r.output.includes('a:') && r.output.includes('b: 1');
});

// 11. 包含逗号的 CSV 转义
test('jsonToCsv 字段含逗号时加引号转义', () => {
  const r = jsonToCsv('[{"text":"a,b"}]');
  return r.error === null && r.output.includes('"a,b"');
});

// 12. 往返一致性：JSON→YAML→JSON
test('往返一致 JSON→YAML→JSON 等价原对象', () => {
  const original = { name: 'DevToolHive', count: 3, tags: ['a', 'b'] };
  const y = jsonToYaml(JSON.stringify(original));
  if (y.error) return false;
  const j = yamlToJson(y.output);
  if (j.error) return false;
  return eq(JSON.parse(j.output), original);
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
