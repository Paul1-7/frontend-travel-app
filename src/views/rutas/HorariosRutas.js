import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import axios from '../../apis';
import useAxios from '../../hooks/useAxios';
import Checkbox from '../../ui-component/forms/container/Checkbox';
import { getFormattedTime } from '../../utils/dataHandler';

const initialForm = {
    idDia: [],
    idHorario: [],
    checkedDia: []
};

const customTime = ({ data }) => {
    const newData = data.map(({ id, horaInicio, horaFin }) => ({
        id,
        hora: `${getFormattedTime(new Date(`August 19, 1975 ${horaInicio}`))} a ${getFormattedTime(new Date(`August 19, 1975 ${horaFin}`))}`
    }));

    return { data: newData };
};

const HorariosRutas = ({ data = [] }) => {
    const [resGetDias, errorGetDias, , axiosFetchGetDias] = useAxios();
    const [resGetHora, errorGetHoras, , axiosFetchGetHora] = useAxios(customTime);
    const [disabledHour, setDisabledHour] = useState([]);
    const { control } = useFormContext();

    const { fields, append, update } = useFieldArray({
        control,
        name: 'horarios'
    });

    const horarios = useWatch({
        control,
        name: 'horarios'
    });

    useEffect(() => {
        axiosFetchGetHora({
            axiosInstance: axios,
            method: 'GET',
            url: `/api/v1/horas/rutas`
        });
        axiosFetchGetDias({
            axiosInstance: axios,
            method: 'GET',
            url: '/api/v1/dias'
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!resGetHora.length || !resGetDias.length || fields.length > 1) return;

        const idDiaArray = data.map(({ idDia }) => idDia);

        resGetDias.forEach(({ id, nombre }, index) => {
            if (idDiaArray.includes(id)) append(data[index]);
            else append({ ...initialForm, idDia: [{ id, nombre }], idHorario: resGetHora });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resGetHora, resGetDias]);

    useEffect(() => {
        if (!horarios.length) return;

        const disableHours = horarios.map(({ checkedDia, ...item }, index) => {
            if (checkedDia?.length) {
                return false;
            }
            console.log(item);
            // update(index, { ...item, idHorario: resGetDias });

            return true;
        });

        setDisabledHour(disableHours);
    }, [horarios]);

    // const updateDisabledHour = (index) => {
    //     const data = [...disabledHour];
    //     data[index] = !data[index];
    //     setDisabledHour(data);
    // };

    return (
        <>
            {!!resGetDias.length && !!resGetHora.length && !errorGetDias && !errorGetHoras && (
                <Grid>
                    {fields.map(({ id, idDia, idHorario, checkedDia }, index) => (
                        <Grid key={id} item container spacing={2}>
                            <Grid item>
                                <Checkbox
                                    name={`horarios.${index}.checkedDia`}
                                    items={idDia}
                                    sx={{ width: '7rem' }}
                                    isArray
                                    // onClick={() => {
                                    //     updateDisabledHour(index);
                                    // }}
                                />
                            </Grid>
                            <Grid item>
                                <Checkbox
                                    name={`horarios.${index}.idHorario`}
                                    items={idHorario}
                                    vertical
                                    isArray
                                    disabled={disabledHour?.[index]}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};
export default HorariosRutas;

HorariosRutas.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
};
