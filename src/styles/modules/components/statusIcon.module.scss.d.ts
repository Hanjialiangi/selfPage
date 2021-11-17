export type Styles = {
  finished: string;
  icon: string;
  pending: string;
  processing: string;
  overed: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
