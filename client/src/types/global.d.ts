type ResultType = {
  id: number;
  result: string;
  equation: string;
  timestamp: Date;
};

type UserProperties = {
  id: string;
  name: string;

  keyboardSupport: boolean;
  theme: string;
};

type Feature = {
  name: string;
  func: () => void;
};
