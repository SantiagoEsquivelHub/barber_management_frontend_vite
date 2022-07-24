import { render } from "@testing-library/react"
import CardUser from "../../../../modules/users/components/CardUser"
import icon from '../../../../assets/images/UserPhoto.png';

describe('Pruebas en <CardUser />', () => {

    test('Debe hacer match con el Snapshot', () => {
        const nombre = 'Santiago';
        const correo = 'santi@correo.com';
        const telefono = 123456789;
        const estado = 1;
        const id = 10;

        const { container } = render(<CardUser nombre={nombre} correo={correo} telefono={telefono} estado={estado} id={id} url={icon}/>)
        expect(container).toMatchSnapshot();
    })

})