import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Movie1 from "../assets/movies/movie1.mov";
import Movie2 from "../assets/movies/movie2.mov";
import Movie3 from "../assets/movies/movie3.mov";
import Movie4 from "../assets/movies/movie4.mov";

const steps = [
  {
    label: "Meimeiとは？",
    description: `関数名を決めてくれるサービスです。`,
  },
  {
    label: "処理を選択",
    description: `はじめに、命名したい関数の処理を選択してください。`,
    video: Movie1,
  },
  {
    label: "対象を入力",
    description:
      "次に、処理に対する対象を入力してください。英語、ローマ字変換が指定可能です。命名ボタンを押せば、関数名が生成されます。",
    video: Movie2,
  },
  {
    label: "補助を選択",
    description: `関数名に「~から」、「~を用いて」などの補助をつけたい場合は選択してください。`,
    video: Movie3,
  },
  {
    label: "補助の対象を入力",
    description: `補助に対する対象を入力してください。英語、ローマ字変換が指定可能です。命名ボタンを押せば、関数名が生成されます。`,
    video: Movie4,
  },
];

export default function Stepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 1,
          bgcolor: "background.default",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>
          {steps[activeStep].label}
        </Typography>
      </Paper>
      <Box
        sx={{
          height: 255,
          maxWidth: 400,
          width: "100%",
          p: 1,
          textAlign: "center",
        }}
      >
        <p className="modal-text">{steps[activeStep].description}</p>
        {steps[activeStep]?.video && (
          <video
            src={steps[activeStep].video}
            className="video"
            autoPlay
            loop
            playsInline
            width={`80%`}
            height={`80%`}
          ></video>
        )}
      </Box>
      <MobileStepper
        sx={{ marginTop: 10 }}
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
