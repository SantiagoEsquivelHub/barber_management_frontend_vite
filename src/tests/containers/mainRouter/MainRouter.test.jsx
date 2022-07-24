import { render } from "@testing-library/react"
import MainRouter from "../../../containers/mainRouter"



describe('Pruebas en <MainRouter />', () => {

    test('Debe hacer match con el Snapshot', () => {
        const { container } = render(<MainRouter location={'/'}/>)
        expect(container).toMatchSnapshot();
    })

})