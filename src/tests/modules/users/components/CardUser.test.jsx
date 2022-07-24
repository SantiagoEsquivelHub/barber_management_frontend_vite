import { render } from "@testing-library/react"
import CardUser from "../../../../modules/users/components/CardUser"

describe('Pruebas en <CardUser />', () => {

    test('Debe hacer match con el Snapshot', () => {
        const { container } = render(<CardUser />)
        expect(container).toMatchSnapshot();
    })

})