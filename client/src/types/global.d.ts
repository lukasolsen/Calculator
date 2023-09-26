type ResultType = {
  id?: number;
  result: string;
  equation: string;
  timestamp: string;
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
