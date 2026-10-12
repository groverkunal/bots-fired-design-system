import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const tokens=JSON.parse(await readFile('src/app/components/ds/typeTokens.json','utf8'));
test('metadata floors and every reported line-height agree with numeric values',()=>{for(const t of tokens){assert.ok(t.sizePx>=12,t.token);if(['overline','label','mono'].includes(t.token))assert.ok(t.sizePx>=14,t.token);assert.equal(parseFloat(t.sizeRem)*16,t.sizePx,t.token);const displayedHeight=t.lineHeightRatio.match(/\((\d+)px\)/)?.[1];assert.equal(Number(displayedHeight),t.lineHeightPx,t.token);const reported=parseFloat(t.lineHeightRatio);assert.ok(Math.abs(reported-t.lineHeightPx/t.sizePx)<.001,t.token)}});
test('table and interactive validator derive the same registry',async()=>{const table=await readFile('src/app/components/ds/TypographySystem.tsx','utf8'),validator=await readFile('src/app/components/ds/VerificationTests.tsx','utf8');assert.match(table,/import \{ TYPE_SCALE/);assert.match(validator,/import \{ TYPE_SCALE/);assert.match(validator,/tokenSpecs = TYPE_SCALE\.map/)});
test('letter-spacing units remain consistent after metadata size corrections',()=>{for(const t of tokens)assert.ok(Math.abs(parseFloat(t.letterSpacingEm)-parseFloat(t.letterSpacingPx)/t.sizePx)<.0001,t.token)});
