import { render } from "@testing-library/react"
import StaffView from "../../../../modules/staff/view/main"

describe('Pruebas en <StaffView />', () => {

    test('Debe hacer match con el Snapshot', () => {
        const { container } = render(<StaffView />)
        expect(container).toMatchSnapshot();
    })

})