import Position from './Position';
import Team from './Team';

export default interface JerseyNumber {
  id: number;
  team: Team;
  position: Position;
}
