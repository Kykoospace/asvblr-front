export default interface Article {
  id: number;
  title: string;
  content: string;
  visible: boolean;
  creationDate: Date;
  lastModificationDate: Date;
}
