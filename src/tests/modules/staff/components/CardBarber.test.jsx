import { render } from "@testing-library/react"
import CardBarber from "../../../../modules/staff/components/CardBarber"
import icon from '../../../../assets/images/UserPhoto.png';

describe('Pruebas en <CardBarber />', () => {


    const nombre = 'Santiago';
    const correo = 'santi@correo.com';
    const telefono = 123456789;
    const estado = 1;
    const id = 10;

    test('Debe hacer match con el Snapshot', () => {
        const { container } = render(<CardBarber nombre={nombre} correo={correo} telefono={telefono} estado={estado} id={id} url={icon} />)
        expect(container).toMatchSnapshot();
    })

})