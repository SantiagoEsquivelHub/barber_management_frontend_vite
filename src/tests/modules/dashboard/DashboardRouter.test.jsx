import { render } from "@testing-library/react"
import DashboardRouter from "../../../modules/dashboard/views/mainView"

describe('Pruebas en <DashboardRouter />', () => {

    test('Debe hacer match con el Snapshot', () => {

        const { container } = render(<DashboardRouter />)
        expect(container).toMatchSnapshot();
    })

 


})