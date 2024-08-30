describe('Импорт компонентов', () => {
    test('Иморт хэдэра', async () => {
        const cmp = await import('../components/layout/TheHeader.vue')
        expect(cmp)
    })
})