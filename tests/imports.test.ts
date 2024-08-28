import { describe, expect, test } from "vitest";
import { render } from "vue";
describe('Импорт компонентов', () => {
    test('Иморт хэдэра', async () => {
        const cmp = await import('../components/layout/TheHeader.vue')
        expect(cmp).toBeDefined()
    })
})