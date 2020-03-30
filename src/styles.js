import styles from 'styled-components'

export const Container = styles.View`
  flex-direction: row;
  padding-top: 4px;
  z-index: 0;
`;

export const ContentRow = styles.View`
  flex-direction: row;
`;

export const TitleInputWrapper = styles.View`
  flex: 1;
  padding: 4px 8px 0;
`;

export const TitleRow = styles.View`
  flex-direction: row;
  flex: 1;
`;

export const DescriptionInputWrapper = styles.View`
  flex: 1
`;
