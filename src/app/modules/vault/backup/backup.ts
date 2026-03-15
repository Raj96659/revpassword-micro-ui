// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { VaultService } from '../../../core/services/vault.service';

// @Component({
//   selector: 'app-backup',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './backup.html',
//   styleUrls: ['./backup.css']
// })
// export class Backup {

//   message = "";

//   constructor(private vaultService: VaultService){}

//   getUserId(){
//     const id = localStorage.getItem("userId");
//     return id ? Number(id) : null;
//   }

//   /* ---------------- EXPORT VAULT ---------------- */

//   exportVault(){

//     const userId = this.getUserId();
//     if(!userId) return;

//     this.vaultService.exportVault(userId).subscribe({

//       next:(data:any)=>{

//         const blob = new Blob([data], { type: "application/json" });

//         const url = window.URL.createObjectURL(blob);

//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "vault-backup.json";
//         a.click();

//         window.URL.revokeObjectURL(url);

//         this.message = "Vault exported successfully";

//         setTimeout(()=>{ this.message=""; },2000);

//       },

//       error:(err)=>{
//         console.error(err);
//         this.message = "Export failed";
//       }

//     });

//   }

//   /* ---------------- IMPORT VAULT ---------------- */

//   importVault(event:any){

//     const userId = this.getUserId();
//     if(!userId) return;

//     const file = event.target.files[0];
//     if(!file) return;

//     this.vaultService.importVault(userId,file).subscribe({

//       next:()=>{

//         this.message = "Vault imported successfully";

//         setTimeout(()=>{ this.message=""; },2000);

//         /* clear file input so same file can be uploaded again */
//         event.target.value = "";

//       },

//       error:(err)=>{
//         console.error(err);
//         this.message = "Import failed";
//       }

//     });

//   }

// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaultService } from '../../../core/services/vault.service';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backup.html',
  styleUrls: ['./backup.css']
})
export class Backup {

  message = "";
  selectedFileName = "";
  uploading = false;

  constructor(private vaultService: VaultService){}

  getUserId(){
    const id = localStorage.getItem("userId");
    return id ? Number(id) : null;
  }

  exportVault(){

    const userId = this.getUserId();
    if(!userId) return;

    this.message = "Preparing backup...";

    this.vaultService.exportVault(userId).subscribe({

      next:(data:any)=>{

        const blob = new Blob([data], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "vault-backup.json";
        a.click();

        window.URL.revokeObjectURL(url);

        this.message = "Backup downloaded successfully ✔";
      },

      error:()=>{
        this.message = "Export failed";
      }

    });

  }

  importVault(event:any){

    const userId = this.getUserId();
    if(!userId) return;

    const file = event.target.files[0];
    if(!file) return;

    this.selectedFileName = file.name;
    this.uploading = true;
    this.message = "Uploading backup...";

    this.vaultService.importVault(userId,file).subscribe({

      next:()=>{
        this.uploading = false;
        this.message = "Vault restored successfully ✔";
      },

      error:()=>{
        this.uploading = false;
        this.message = "Import failed";
      }

    });

  }

}