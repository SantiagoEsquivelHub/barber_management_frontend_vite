import { render } from "@testing-library/react"
import CardTop from "../../../../modules/dashboard/components/CardTop";
import icon from '../../../../assets/images/UserPhoto.png';


describe('Pruebas en <CardTop />', () => {

    test('Debe hacer match con el Snapshot', () => {

        const nombre = 'Santiago';
        const numServicios = 'Santiago';
        const id = 10;

        const { container } = render(<CardTop nombre={nombre} url={icon} numServicios={numServicios} id={id}/>)
        expect(container).toMatchSnapshot();
    })

})