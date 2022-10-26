package entitees;

import project01.AdressePostale;
/**
 * Surcharger le constructeur de la classe M�re quand il y a des param�tres
 * et qu'il n'y a pas de constructeur par d�faut : Personne()
 *
 * Quand on impl�mente une interface on doit surcharger toutes les m�thodes
 * non valoris�es de l'interface (depuis la 1.8 -> 1.9 on peut donner des
 * comportement par d�faut dans une m�thode d'une interface Java
 *
 * @author chris
 *
 */
public class Lettre{

        public Lettre(String nom, String prenom, AdressePostale adr) {
                super(nom, prenom, adr);
                // TODO Auto-generated constructor stub
                //1er commit branch  fonction1
        }



}
