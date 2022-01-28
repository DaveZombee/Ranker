
public class Item {

	private String name; // the item's name
	private int rank; // the item's rank
	private int[] battles; // battles that item has won
	
	public Item(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}
	
	public int[] getBattles() {
		return battles;
	}
	
	// Sets element of battle as win
	public void setBattleWin(int element) {
		battles[element] = 2; // 2 = win
	}
	
	// sets element of battle as lose
	public void setBattleLose(int element) {
		battles[element] = 1; // 1 = lose
	}
	
	// Creates and sets all the values of battles to be null
	public void createBattle(int listLength) {
		battles = new int[listLength];
		
		for (int i = 0; i < listLength; i++) {
			battles[i] = 0; // zero = hasn't battled yet
		}
	}
	
//	public static void main(String[] args) {		
//		LinkedList<Item> listOfItems = new LinkedList<Item>();
//		
//		listOfItems.add(new Item("craphole"));
//		listOfItems.add(new Item("mouthface)"));
//		
//		int listLength = listOfItems.size();
//		
//		// making battle array for craphole
//		listOfItems.get(0).createBattle(listLength);
//	}
}
