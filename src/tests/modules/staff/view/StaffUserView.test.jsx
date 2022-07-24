import { render } from "@testing-library/react"
import StaffUserView from "../../../../modules/staff/view/staffUser"

describe('Pruebas en <StaffUserView />', () => {

    test('Debe hacer match con el Snapshot', () => {
        const { container } = render(<StaffUserView />)
        expect(container).toMatchSnapshot();
    })

})