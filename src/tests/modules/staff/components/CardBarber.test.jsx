import { render } from "@testing-library/react"
import CardBarber from "../../../../modules/staff/components/CardBarber"

describe('Pruebas en <CardBarber />', () => {

    test('Debe hacer match con el Snapshot', () => {
        const { container } = render(<CardBarber />)
        expect(container).toMatchSnapshot();
    })

})