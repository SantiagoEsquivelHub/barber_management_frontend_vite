import { render } from '@testing-library/react'
import BarChart from '../../../components/BarChart';
import useResizeObserver from "use-resize-observer";

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

describe('Pruebas en <BarChart />', () => {

    test('Debe hacer match con el Snapshot', () => {

        const data = [
            { nombre_servicio: 'Corte de cabello', count: 1 },
            { nombre_servicio: 'Barba', count: 7 },
            { nombre_servicio: 'Corte de cabello y Barba', count: 3 },

        ]
        const { container } = render(<BarChart data={data} />);
        expect(container).toMatchSnapshot();
    })

})