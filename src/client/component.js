function JsxTest(hello) {
    return /*html*/`
        <div>
            <h1>JSX Test</h1>
            <p>This is a test of JSX.</p>
            <p>Hello ${hello}</p>
        </div>
    `
}

export { JsxTest };