import { render } from "@testing-library/react"
import UsersView from "../../../modules/users"

describe('Pruebas en <UsersView />', () => {

    test('Debe hacer match con el Snapshot', () => {
        const { container } = render(<UsersView />)
        expect(container).toMatchSnapshot();
    })

})