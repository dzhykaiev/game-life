import React, { Dispatch, SetStateAction } from "react";
import s from "./ControlPanel.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Game } from "../Game/Store";
import * as Yup from "yup";

type Props = {
  gameStore: Game;
  interval: {
    ms: number;
    setMs: Dispatch<SetStateAction<number>>;
  };
};

const ControlPanel = (props: Props) => {
  return (
    <div className={s.ControlPanel}>
      <Formik
        initialValues={{
          interval: props.interval.ms,
          gridSize: props.gameStore.gridSize
        }}
        validationSchema={Yup.object({
          interval: Yup.number().required("Required"),
          gridSize: Yup.number().required("Required")
        })}
        onSubmit={(values, { setSubmitting }) => {
          props.interval.setMs(values.interval);
          props.gameStore.changeSize(values.gridSize);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={s.Form}>
            <label className={s.Field}>
              <span>{props.interval.ms / 1000} s</span>
              <Field type="number" name="interval" />
              <ErrorMessage name="interval" component="div" />
            </label>
            <label className={s.Field}>
              <span>
                {props.gameStore.gridSize}x{props.gameStore.gridSize}
              </span>
              <Field type="number" name="gridSize" />
              <ErrorMessage name="gridSize" component="div" />
            </label>

            <button type="submit" disabled={isSubmitting} className={s.Button}>
              Save
            </button>
          </Form>
        )}
      </Formik>
      <button className={s.Button} onClick={props.gameStore.refresh}>
        Refresh
      </button>
    </div>
  );
};

export default ControlPanel;
