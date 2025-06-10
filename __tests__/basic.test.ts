describe('Basic Test', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should format date correctly', () => {
    const date = new Date('2025-06-10');
    const formatted = date.toISOString().split('T')[0];
    expect(formatted).toBe('2025-06-10');
  });
});
